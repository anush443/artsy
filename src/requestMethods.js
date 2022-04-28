import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6MSwiaWF0IjoxNjUwNTUwNjQ2LCJleHAiOjE2NTA4MDk4NDZ9.pl2a0GOXkKRpdzdaAE8TYW7OIyT1lEeUhI6ZBmga5kg";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
