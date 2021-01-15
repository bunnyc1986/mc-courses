import { useState, useEffect, useCallback } from 'react';

import CourseCard from './components/CourseCard';

const useCoursesData = () => {
    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch("/courses.json");
            setCoursesData(await resp.json());
        };
        fetchData();
    }, []);

    return coursesData;
}

const API = "http://localhost:3001/api/favorites";

const postData = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
}

const useFavorites = () => {
    const [favorites, setFavorites] = useState(new Set());
    
    useEffect(() => {
        (async () => {
            const resp = await fetch(API);
            setFavorites(new Set(await resp.json()));
        })();
    }, []);

    const toggleFavorite = useCallback(async (id) => {
        const resp = await postData(API, { id });
        setFavorites(new Set(await resp.json()));
    }, []);

    return [favorites, toggleFavorite];
}

const CoursesList = () => {

    const coursesData = useCoursesData();
    const [favorites, toggleFavorite] = useFavorites();
    const courses = coursesData.map((cours) => ({...cours, isFav: favorites.has(cours.id)}));

    return (
        <div>
            <ul>
                {courses.map( course => (
                    <CourseCard key={course.id} course={course} onClick={() => toggleFavorite(course.id)} />
                ))}
            </ul>
        </div>
    )
}

export default CoursesList;