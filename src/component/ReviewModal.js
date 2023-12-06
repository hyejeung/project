//mypage 리뷰작성 모달
import React, { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // 여기서 리뷰 작성 로직을 수행하고, 부모 컴포넌트로 전달
    onSubmit({ rating, comment });
    // 모달 닫기
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal">
        <h2>리뷰 작성</h2>
        <div>
          <label htmlFor="rating">별점 선택</label>
          <select id="rating" value={rating} onChange={(e) => handleRatingChange(Number(e.target.value))}>
            <option value={1}>1점</option>
            <option value={2}>2점</option>
            <option value={3}>3점</option>
            <option value={4}>4점</option>
            <option value={5}>5점</option>
          </select>
        </div>
        <div>
          <label htmlFor="comment">리뷰 작성</label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            placeholder="리뷰를 작성해주세요."
          />
        </div>
        <div>
          <button className="submit-button" onClick={handleSubmit}>
            작성 완료
          </button>
          <button className="close-button" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
