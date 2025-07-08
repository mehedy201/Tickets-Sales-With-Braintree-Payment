import { useNavigate } from 'react-router-dom';

const useQueryParams = () => {
  const navigate = useNavigate();

  const generateUrl = (basePath, params = {}) => {
    const queryParams = [];
    
    if (params.search) queryParams.push(`search=${encodeURIComponent(params.search)}`);
    
    return `${basePath}${queryParams.length ? '?' + queryParams.join('&') : ''}`;
  };

  const navigateWithParams = (basePath, params = {}) => {
    navigate(generateUrl(basePath, params));
  };

  return { generateUrl, navigateWithParams };
};

export default useQueryParams;