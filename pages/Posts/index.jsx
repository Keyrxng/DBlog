import { Button } from "@web3uikit/core";
import Link from "next/link";
import { useRouter } from "next/router";

const Posts = () => {

    return (
        <><p>sup</p><ul>
            <li>
                <Link href='/Posts/0'>
                    <Button text="Blog 1" type="button"/>
                </Link>
            </li>
        </ul></>
    )
}

export default Posts;