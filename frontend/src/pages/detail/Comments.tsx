import React, { useEffect } from 'react';
import { List, Comment, Avatar, Spin, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../../redux/hooks";
import { fetchCommentsByHotelId, addComment, CommentData } from '../../redux/comments/slice';
import { RootState } from '../../redux/store';
import { useState } from 'react';

const { TextArea } = Input;

interface CommentsProps {
  hotelId: string;
}

const Comments: React.FC<CommentsProps> = ({ hotelId }) => {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.comments.loading);
  const error = useSelector((state: RootState) => state.comments.error);
  const comments = useSelector((state: RootState) => state.comments.comments);

  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    if (hotelId) {
      dispatch(fetchCommentsByHotelId(hotelId));
    }
  }, [hotelId, dispatch]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ itemId: hotelId, itemType: 'hotel', comment: newComment }));
      setNewComment("");
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  return (
    <>
      <List
        className="comment-list"
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item: CommentData) => (
          <li>
            <Comment
              author={item.userName}
              avatar={<Avatar src={item.userAvatar} alt={item.userName} />}
              content={item.content}
              datetime={item.date}
            />
          </li>
        )}
      />
      <div style={{ marginTop: 20 }}>
        <TextArea
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <Button type="primary" onClick={handleAddComment} style={{ marginTop: 10 }}>
          Add Comment
        </Button>
      </div>
    </>
  );
};

export default Comments;