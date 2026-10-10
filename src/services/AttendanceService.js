import api from './api';

export const attendanceService = {
    // Lấy danh sách sinh viên: GET /students[cite: 6]
    getStudents: async () => {
        const response = await api.get('/students');
        return response.data;
    },

    // Gửi thông tin điểm danh: POST /atendance[cite: 6]
    submitAttendance: async (attendanceData) => {
        const response = await api.post('/atendance', attendanceData);
        return response.data;
    },

    // Cập nhật điểm danh: PUT /update/:id[cite: 6]
    updateAttendance: async (id, updatedData) => {
        const response = await api.put(`/update/${id}`, updatedData);
        return response.data;
    },

    // Xóa buổi điểm danh: DELETE /session/:id[cite: 6]
    deleteSession: async (sessionId) => {
        const response = await api.delete(`/session/${sessionId}`);
        return response.data;
    },
};