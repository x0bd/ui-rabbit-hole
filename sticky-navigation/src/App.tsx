import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Ghost, PawPrint, Sun } from "lucide-react";

function App() {
	return (
		<div className="min-h-[300vh] bg-gradient-to-b from-[rgba(255,255,255,.1)] to-[rgba(255,255,255,0)]">
			<Nav />

			<div className="overflow-clip opacity-30">
				<p className="break-all text-[30vw] text-zinc-600">
					Beautiful sticky navigation that plays peak-a-boo on scroll
				</p>
			</div>
		</div>
	);
}

const Nav = () => {
	const [isHidden, setIsHidden] = useState(false);
	const { scrollY } = useScroll();
	const lastYRef = useRef(0);

	useMotionValueEvent(scrollY, "change", (y) => {
		const difference = y - lastYRef.current;
		if (Math.abs(difference) > 50) {
			setIsHidden(difference > 0);

			lastYRef.current = y;
		}
	});

	return (
		<motion.div
			animate={isHidden ? "hidden" : "visible"}
			whileHover="visible"
			onFocusCapture={() => setIsHidden(false)}
			variants={{
				hidden: {
					y: "-90%",
				},
				visible: {
					y: "0%",
				},
			}}
			transition={{ duration: 0.2 }}
			className="fixed top-0 z-10 flex w-full justify-center pt-3"
		>
			<nav className="max-w-[600px] bg-zinc-100 border-2 border-zinc-600 w-full rounded-full mx-auto flex items-center justify-between px-8">
				<div className="flex h-[80px] min-h-[60px] items-center gap-x-10">
					<a href="/" className="flex items-center gap-2">
						<PawPrint className="stroke h-11 w-11" />
					</a>
					<div className="flex text-xl items-center gap-4 h-full">
						<a href="#">Dashboard</a>
						<a href="#">Transactions</a>
						<a href="#">Manage</a>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Sun />
					<Ghost />
				</div>
			</nav>
		</motion.div>
	);
};

export default App;
