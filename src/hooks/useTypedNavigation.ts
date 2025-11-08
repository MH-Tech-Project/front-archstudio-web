import { useNavigate } from "react-router-dom";
import type { RedirectTo } from "../routes";

export const useTypedNavigate = () => {
  const navigate = useNavigate()
  
  return {
    navigateTo: (route: RedirectTo, options?: { replace?: boolean; state?: any }) => {
      navigate(route, options)
    },
    goBack: () => navigate(-1),
    goForward: () => navigate(1)
  }
}