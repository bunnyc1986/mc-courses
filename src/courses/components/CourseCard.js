import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Card = styled.li`
    list-style: none;
    clear: both;
    height: 80px;
    margin: 0;
    padding: 0;
    border-bottom: solid 1px #dddd;

    img {
        float: left;
        height: 100%;
    }

    .body {
        float: left;
        margin-left: 20px;
        height: 80px;
    }

    .action {
        display: ${props => props.isFav ? "block" : "none"};
        float: right;
        padding: 8px;
    }
    
    :hover {
        .action {
            display: block;
        }
    }
`;

const HeartButton = ({active, ...props}) => active ? <FaHeart {...props} /> : <FaRegHeart {...props}/>;


const CourseCard = ({ course, onClick }) => (
    <Card onClick={onClick} isFav={course.isFav}>
        <img src={course.instructor_image_url} alt={course.instructor_name} />
        <div className="body">
            <h2>{course.instructor_name}</h2>
            <p>{course.title}</p>
        </div>
        <div className="action">
            <HeartButton size="2em" color="red" active={course.isFav} />
        </div>
        {/* {course.description} */}
    </Card>
)

export default CourseCard;