import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../styles/Home.module.css";
import Navbar from "./Navbar";
import { Form } from "@web3uikit/core";
import blogAbi from "../lib/blogAbi.json";
import { blogAddr } from "../lib/addresses";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import {
	usePrepareContractWrite,
	useContractWrite,
	useWaitForTransaction,
} from "wagmi";

function Poster() {
	const [post, setPost] = useState();
	const [postImg, setPostImg] = useState("");
	const [postTitle, setPostTitle] = useState("");
	const [postDesc, setPostDesc] = useState("");
	const [postTags, setPostTags] = useState("");

	const editorRef = useRef(null);

	const log = () => {
		if (editorRef.current) {
			setPost(editorRef.current.getContent());
			console.log(editorRef.current.getContent());
		}
	};

	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: blogAddr,
		abi: blogAbi,
		functionName: "mint",
		args: [postTitle, postDesc, post, postImg, postTags],
	});

	const { data, error, isError, write } = useContractWrite(config);
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	const handleFileInputChange = (e) => {
		if (e.target.files === null) {
			if (e.target.id === "input_0") {
				setPostTitle(e.target.value);
			} else if (e.target.id === "input_1") {
				setPostDesc(e.target.value);
			} else if (e.target.id === "input_2") {
				setPostTags(e.target.value);
			}
		} else {
			let file;

			file = e.target.files[0];
			setPostImg(file);
		}
	};

	const handleSubmit = async () => {
		const storage = new ThirdwebStorage();
		const imgUri = await storage.upload(postImg);
		const newPost = [
			{
				name: postTitle,
				description: postDesc,
				image: imgUri,
				content: post,
				tags: postTags,
			},
		];

		const uri = await storage.upload(newPost);
		console.log(uri);
		setPostImg(uri);
		let tx = write(config);
		if (isError || isPrepareError) {
			console.error("error: ", error, prepareError);
		}
		if ((isLoading, isSuccess)) {
			console.log("success: ", data);
		}
	};

	return (
		<div className="w-full  dark:bg-gray-900 dark:text-gray-100">
			<Navbar />

			<main className={styles.main}>
				<>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Editor
							id="lol"
							apiKey={process.env.POSTER_API_KEY}
							onInit={(evt, editor) =>
								(editorRef.current = editor)
							}
							initialValue="<p>This is the initial content of the editor.</p>"
							init={{
								height: 600,
								menubar: false,
								plugins: [
									"advlist",
									"autolink",
									"lists",
									"link",
									"image",
									"charmap",
									"preview",
									"anchor",
									"searchreplace",
									"visualblocks",
									"code",
									"fullscreen",
									"insertdatetime",
									"media",
									"table",
									"code",
									"help",
									"wordcount",
								],
								toolbar:
									"undo redo | blocks | " +
									"bold italic forecolor | alignleft aligncenter " +
									"alignright alignjustify | bullist numlist outdent indent | " +
									"removeformat | help",
								content_style:
									"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
							}}
						/>
						<Form
							name="thisForm"
							buttonConfig={{
								onClick: function noRefCheck() {},
								theme: "primary",
							}}
							data={[
								{
									inputWidth: "100%",
									name: "blog title",
									type: "text",
									validation: {
										required: true,
									},
									value: "",
								},
								{
									inputWidth: "100%",
									name: "blog description",
									type: "text",
									validation: {
										required: true,
									},
									value: "",
								},
								{
									inputWidth: "100%",
									name: "blog tags, separate with commas",
									type: "text",
									validation: {
										required: true,
									},
									value: "",
								},
								{
									inputWidth: "100%",
									name: "Image",
									type: "file",
									validation: {
										required: true,
									},
									value: "",
								},
							]}
							onChange={handleFileInputChange}
							onSubmit={handleSubmit}
							title="New Blog Post"
						/>
					</div>

					<div className={styles.section}>
						{" "}
						<div
							className={styles.button_container}
							style={{
								position: "sticky",
								justifyContent: "space-between",
								alignContent: "center",
							}}
						>
							<button
								style={{ margin: "5px", scale: "1" }}
								className={styles.button}
								onClick={log}
							>
								Save Contents
							</button>
						</div>
					</div>
				</>
			</main>
		</div>
	);
}

export default Poster;
