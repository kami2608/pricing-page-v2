import { FC } from "react";
import { useNavigate } from "react-router-dom";

const RouteButtons: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/rtk")}>RTK todo list</button>
      <button onClick={() => navigate("/rtk-query")}>
        RTK Query todo list
      </button>
      <button onClick={() => navigate("/react-query")}>
        React Query todo list
      </button>
      <button onClick={() => navigate("/paginated-queries")}>
        Paginated todos
      </button>
      <button onClick={() => navigate("/infinite-queries")}>
        Infinite todos
      </button>
    </div>
  );
};

export default RouteButtons;
