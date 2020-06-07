import { useState, useCallback } from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (
            url,
            method = 'POST',
            body = null,
            headers = {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
            isFormData,
        ) => {
            setLoading(true);
            try {
                if (body) {
                    body = isFormData ? body : JSON.stringify(body);
                }

                const response = await fetch(url, { method, body, headers });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);

                setLoading(false);
                return data;
            } catch (err) {
                setLoading(false);
                setError(err);
            }
        },
        [],
    );

    const clearError = () => setError(null);

    return { loading, request, error, clearError };
};

export default useHttp;
