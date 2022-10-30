import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../../styles/Home.module.css";
import { Section } from "../layout/section";
import Navbar from "../components/Navbar";
import { Form } from "@web3uikit/core";
import blogAbi from '../utils/blogAbi.json'
import {blogAddr} from '../utils/addresses'
import { ThirdwebStorage } from "@thirdweb-dev/storage";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

function Poster() {
	const [post, setPost] = useState();
	const [postImg, setPostImg] = useState();
	const [allBlogs, setAllBlogs] = useState([]);

	const editorRef = useRef(null); 

	const log = () => {
		if (editorRef.current) {
			setPost(editorRef.current.getContent());
			console.log(editorRef.current.getContent());
		}
	};
	const web3 = createAlchemyWeb3(
		"wss://polygon-mumbai.g.alchemy.com/v2/-z5MVCeYJhwocIX9iwkcCbNmUq0odNWo",
	  );
	  const blogContract = new web3.eth.Contract(blogAbi, blogAddr)

	 const getBase64 = file => {
		return new Promise(resolve => {
		  let fileInfo;
		  let baseURL = "";
		  // Make new FileReader
		  let reader = new FileReader();
	
		  // Convert the file to base64 text
		  reader.readAsDataURL(file);
	
		  // on reader load somthing...
		  reader.onload = () => {
			// Make a fileInfo Object
			console.log("Called", reader);
			baseURL = reader.result;
			console.log(baseURL);
			resolve(baseURL);
		  };
		  console.log(fileInfo);
		});
	  };
	
	 const handleFileInputChange = e => {
		console.log(e.target.files[0]);
		let { file } = this.state;
	
		file = e.target.files[0];
	
		getBase64(file)
		  .then(result => {
			file["base64"] = result;
			console.log("File Is", file);
			this.setState({
			  base64URL: result,
			  file
			});
		  })
		  .catch(err => {
			console.log(err);
		  });
	
		this.setState({
		  file: e.target.files[0]
		});
	  };

	const handleSubmit = async () => {
		console.log("Event Title:", event.target[0].value);
		console.log("Event Title:", event);
		console.log("Event Title:", event.target);
		console.log("Event Desc:", event.target[1].value);
		console.log("Event tags:", event.target[2].value);
		console.log("Event Image:", postImg);
		console.log("Blog Post:", post);

		// const stuff = getBase64(postImg)
		console.log(event.target)
		    
		const newPost = [{
            name: event.target[0].value,
            description: event.target[1].value,
            image: fs.readFileSync,
            content: post,
			tags: event.target[2].value,
        }]

		/// call contract mint function passing data
		


        const storage = new ThirdwebStorage();
		const imgUri = await storage.upload(postImg);
		console.log("imgUrl", imgUri)
        const uri = await storage.upload(newPost);
		console.log("uri: ", uri)
        const res = await storage.download(uri)
        const data = await res.text();
        let tx = await blogContract.methods.mint(event.target[0].value, event.target[1].value, post, uri, event.target[2].value).send({from: '0xD0CE7E521d26CAc35a7B10d31d6CCc7ffFF8B15e' });
	};

	
    

	return (
		<div className="w-full  dark:bg-gray-900 dark:text-gray-100">
			<Navbar />

			<main className={styles.main}>
				<Section>
					<>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Editor
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
							<div className={styles.section}></div>
						</div>
					</>
				</Section>
			</main>
		</div>
	);
}

export default Poster;
