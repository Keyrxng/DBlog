import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../../styles/Home.module.css";
import { Section } from "../layout/section";
import Navbar from "../components/Navbar";
import { Form } from "@web3uikit/core";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import blogAbi from '../utils/blogAbi.json'
import {blogAddr} from '../utils/addresses'
import { alchemy } from '../utils/alchemy' 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

function Poster() {
	const [value, setValue] = useState("");
	const [post, setPost] = useState();
	const [postTitle, setPostTitle] = useState();
	const [postDesc, setPostDesc] = useState();
	const [postImg, setPostImg] = useState();

	const editorRef = useRef(null); 

    // Using default settings - pass in a settings object to specify your API key and network

    const web3 = createAlchemyWeb3(
        "wss://polygon-mumbai.g.alchemy.com/v2/-z5MVCeYJhwocIX9iwkcCbNmUq0odNWo",
      );

	const log = () => {
		if (editorRef.current) {
			setPost(editorRef.current.getContent());
			console.log(editorRef.current.getContent());
		}
	};

	const handleSubmit = async () => {
		console.log("Event Title:", event.target[0].value);
		console.log("Event Desc:", event.target[1].value);
		console.log("Event Image:", postImg);
		console.log("Blog Post:", post);

        const newPost = [{
            name: event.target[0].value,
            description: event.target[1].value,
            image: postImg,
            content: post,
        }]

        // const storage = new ThirdwebStorage();
        // const uri = await storage.upload(newPost);
        // const res = await storage.download(uri)
        // const data = await res.text();

		/// call contract mint function passing data
        let accounts = web3.eth.getAccounts(console.log)

        const blogContract = new web3.eth.Contract(blogAbi, blogAddr, {
            from: accounts[0],
            gasPrice: '20000000000',
        })

        let tx = await blogContract.methods.mint(event.target[0].value, event.target[1].value, post).send({from: '0xD0CE7E521d26CAc35a7B10d31d6CCc7ffFF8B15e' });
        console.log("pre-wait:", tx)
        await tx
        console.log(tx)
        // web3.eth.getAccounts().then(accounts => {
        //     web3.eth.sendTransaction({
        //       from: accounts[0],
        //       to: "0x6A823E…",
        //       value: "1000000000000000000",
        //     });
        //   });
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
									height: 500,
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
										name: "Image",
										type: "file",
										validation: {
											required: true,
										},
										value: "",
									},
								]}
								onChange={(e) => setPostImg(e.target.value)}
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
				<h2>Write Post Save Contents </h2>
			</main>
		</div>
	);
}

export default Poster;
