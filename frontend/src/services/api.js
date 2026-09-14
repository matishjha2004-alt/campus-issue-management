const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    return response.json();
};

export const loginUser = async (loginData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    });

    return response.json();
};

export const createIssue = async (issueData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/issues`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(issueData)
    });

    return response.json();
};

export const getMyIssues = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/issues/my`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
};

export const getAdminIssues = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/admin/issues`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
};

export const updateIssueStatus = async (issueId, status) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/admin/issues/${issueId}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        }
    );

    return response.json();
};

export const getIssueById = async (issueId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/issues/${issueId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.json();
};

export const getComments = async (issueId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/issues/${issueId}/comments`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
};

export const addComment = async (issueId, message) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/issues/${issueId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message })
    });

    return response.json();
};

export const getAdminUsers = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/admin/users`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
};

export const assignIssue = async (issueId, userId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/admin/issues/${issueId}/assign`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                assignedTo: userId
            })
        }
    );

    return response.json();
};

export const getAdminStats = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/admin/stats`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
};