import { useState, useCallback } from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
                headers['credentials'] = 'include';
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            setLoading(false);
            return data;
        } catch (err) {
            setLoading(false);
            setError(err);
        }
    }, []);

    const clearError = () => setError(null);

    return { loading, request, error, clearError };
};

export default useHttp;
