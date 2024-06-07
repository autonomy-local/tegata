import Header from "../../contents/common/header";

const ProductPage = () => {
	return (
		<div class="bg-gray-100 h-screen">
			<Header />
			<div class="max-w-7xl mx-auto my-2 py-6 sm:px-6 lg:px-8">
				<div class="flex justify-center items-center">
					<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
