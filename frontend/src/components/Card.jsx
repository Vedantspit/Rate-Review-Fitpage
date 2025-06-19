import { useEffect, useState } from 'react';
import axios from 'axios';

const Card = ({ product, userId }) => {
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [photo, setPhoto] = useState(null);
    const [msg, setMsg] = useState('');
    const [reviews, setReviews] = useState([]);
    const [summary, setSummary] = useState(null);
    const [filter, setFilter] = useState(null);

    const fetchSummary = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/summary/${product.id}`);
            setSummary(res.data);
        } catch (err) {
            console.error("Summary error:", err);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/review/${product.id}`);
            setReviews(res.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    useEffect(() => {
        fetchSummary();
        fetchReviews();
    }, [product.id, msg]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('productId', product.id);
        formData.append('rating', rating);
        formData.append('review', review);
        if (photo) formData.append('photo', photo);

        try {
            await axios.post('http://localhost:3001/api/review', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMsg('✅ Review submitted successfully!');
            setRating('');
            setReview('');
            setPhoto(null);
        } catch (err) {
            setMsg('❌ ' + (err.response?.data?.message || 'Submission failed'));
        }
    };

    const filteredReviews = filter ? reviews.filter(r => r.rating === filter) : reviews;

    return (
        <div className="p-4 border rounded shadow bg-white w-full max-w-md mx-auto md:mx-0">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 rounded mb-4 object-contain"
            />

            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

            <label className="block text-sm font-medium">Rating:</label>
            <select
                className="border rounded w-full mb-2 p-2"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                ))}
            </select>

            <label className="block text-sm font-medium">Review (optional):</label>
            <textarea
                className="border rounded w-full mb-2 p-2"
                rows={2}
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />

            <label className="block text-sm font-medium">Upload Photo (optional):</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="border rounded w-full mb-2 p-2"
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
                Submit
            </button>

            {msg && <p className="text-sm mt-2">{msg}</p>}

            {summary && (
                <div className="mt-4 text-sm">
                    <h3 className="text-lg font-semibold mb-1">Customer reviews</h3>

                    {/* Average Rating */}
                    {(() => {
                        const total = Object.entries(summary.ratingCounts).reduce(
                            (acc, [star, count]) => acc + star * count,
                            0
                        );
                        const count = Object.values(summary.ratingCounts).reduce((a, b) => a + b, 0);
                        const avg = count ? (total / count).toFixed(1) : '0.0';

                        return (
                            <>
                                <div className="flex items-center mb-1 text-yellow-500">
                                    <div className="text-xl font-bold">{avg}</div>
                                    <div className="ml-1 text-yellow-400">
                                        {'★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg))}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600 mb-3">{count.toLocaleString()} global ratings</div>
                            </>
                        );
                    })()}

                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = summary.ratingCounts[star] || 0;
                        const total = Object.values(summary.ratingCounts).reduce((a, b) => a + b, 0);
                        const percent = total ? Math.round((count / total) * 100) : 0;

                        return (
                            <div
                                key={star}
                                className="flex items-center justify-between gap-2 mb-1 cursor-pointer"
                                onClick={() => setFilter(filter === star ? null : star)}
                            >
                                <span className="min-w-[60px] text-sm text-blue-600 hover:underline">
                                    {star} star
                                </span>
                                <div className="flex-1 bg-gray-200 h-3 rounded">
                                    <div
                                        className="bg-orange-500 h-3 rounded"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-gray-700 w-[30px] text-right">{percent}%</span>
                            </div>
                        );
                    })}

                    <h4 className="mt-3 font-semibold">Top Tags:</h4>
                    <div className="flex flex-wrap gap-2 mt-1 max-w-full">
                        {summary?.topTags?.length > 0 ? (
                            summary.topTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 px-2 py-1 rounded text-xs border whitespace-nowrap"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-gray-500">No tags yet</span>
                        )}
                    </div>
                    
                </div>
            )}

            {filteredReviews.length > 0 && (
                <div className="mt-4 border-t pt-2">
                    <h3 className="text-md font-semibold mb-2">
                        {filter ? `${filter} Star Reviews` : 'Other Reviews:'}
                    </h3>
                    {filteredReviews.map((r, i) => (
                        <div key={i} className="mb-3 p-2 border rounded bg-gray-50">
                            <p><strong>Rating:</strong> {r.rating} ⭐</p>
                            {r.review && <p><strong>Review:</strong> {r.review}</p>}
                            {r.photo && (
                                <img
                                    src={`http://localhost:3001/uploads/${r.photo}`}
                                    alt="review"
                                    className="w-full max-h-48 object-contain mt-2 rounded"
                                />
                            )}
                            <p className="text-xs text-gray-500 mt-1">User ID: {r.userId}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Card;
