import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";

function FollowPointer({
	x,
	y,
	info,
}: {
	x: number;
	y: number;
	info: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const color = stringToColor(info.email || "1");
	return (
		<motion.div
			className="h-4 w-4 rounded-full absolute z-50"
			style={{
				top: y,
				left: x,
				pointerEvents: "none",
			}}
			initial={{ scale: 1, opacity: 1 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0, opacity: 0 }}
		>
			 <svg
				stroke={color}
				fill={color}
				strokeWidth="1"
				viewBox="0 0 16 16"
				className={`h-6 w-6 text-[${color}] transform -rotate-[70deg]
                -translate-x-[12px] -translate-y-[10px] stroke-[${color}]`}
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
				></path>
			</svg> 

            
{/* 
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 64 64"
                stroke={color}
                fill={color}
                strokeWidth="1"
				className={`h-6 w-6 text-[${color}] transform -rotate-[0deg]
                -translate-x-[12px] -translate-y-[10px] stroke-[${color}]`}
			>
				<rect
					width="6.6"
					height="16.9"
					x="22.5"
					y="25.5"
					fill="#6c19ff"
					transform="rotate(-25.52 25.81 34)"
				></rect>
				<polygon fill="#3dd9eb" points="11.9,5 12.3,36.3 36.1,24.9"></polygon>
				<rect
					width="6.6"
					height="4.7"
					x="19.9"
					y="26.1"
					fill="#00b3d7"
					transform="rotate(-25.52 23.181 28.493)"
				></rect>
			</svg> */}
			<motion.div
				style={{
					background: color,
				}}
				initial={{
					scale: 0.5,
					opacity: 0,
				}}
				animate={{
					scale: 1,
					opacity: 1,
				}}
				exit={{
					scale: 0.5,
					opacity: 0,
				}}
				className="px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max
                text-xs rounded-full"
			>
				{info?.name || info.email}
			</motion.div>
		</motion.div>
	);
}
export default FollowPointer;
