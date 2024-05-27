import { useNavigate } from 'react-router-dom';

export default function NavButton(props) {
    const color = props.color;
    const text = props.text;
    const naviLink = props.naviLink;
    const common = 'w-20 rounded-md flex justify-center items-center hover:cursor-pointer';
    const navigate = useNavigate();

    return (
        <div
            className={`${common} ${color === 'white' ? 'bg-white hover:bg-main-green hover:text-white' : 'bg-main-green text-white hover:bg-white hover:text-black'}`}
            onClick={() => navigate(naviLink)}
        >
            <span>{text}</span>
        </div>
    );
}
