export default function FormButton(props) {
    const text = props.text;
    const able = props.able;
    const func = props.func;
    const common = 'w-72 h-14 rounded-lg flex items-center justify-center m-auto';

    return (
        <div
            className={`${common} ${able ? 'bg-main-green text-white hover:brightness-75 over:cursor-pointer' : 'bg-[#E0E0E0] text-black'}`}
            onClick={func}
        >
            <p>{text}</p>
        </div>
    );
}
