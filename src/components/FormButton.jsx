export default function FormButton(props) {
    const text = props.text;
    const able = props.able;
    const common = 'w-72 h-14 rounded-lg flex items-center justify-center m-auto';

    return (
        <button type="submit" className={`${common} ${able ? 'bg-main-green text-white hover:brightness-75 over:cursor-pointer' : 'bg-[#E0E0E0] text-black'}`}>
            <p>{text}</p>
        </button>
    );
}
