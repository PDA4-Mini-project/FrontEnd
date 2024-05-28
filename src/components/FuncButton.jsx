export default function FuncButton(props) {
    const func = props.func;
    const text = props.text;
    const size = props.size === 'sm' ? 'w-24' : 'w-72';
    const color = props.color === 'green' ? 'bg-main-green text-white' : 'bg-[#E0E0E0] text-black';
    const common = 'h-14 rounded-lg flex justify-center hover:cursor-pointer hover:brightness-125';

    return (
        <div className={`${size} ${color} ${common}`} onClick={func}>
            <p className="font-bold my-auto">{text}</p>
        </div>
    );
}
