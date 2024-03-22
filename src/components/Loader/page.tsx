import { Spinner } from "@nextui-org/react";

const Loader: React.FC = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<Spinner />
		</div>
	);
};

export default Loader;
