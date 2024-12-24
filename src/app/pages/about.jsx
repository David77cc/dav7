import React from "react";
import "./pages css/about.css";

function About() {
	let divs =
		"w-5/6 h-full shadow-custom-dark flex justify-center bg-[#cff] flex-col rounded-1rem px-5 gap-1 py-2";
	let aboutHeader = "text-2xl text-[#48b9a1] mb-4";
	let text = "font-light text-lg mb-2";
	return (
		<section className="fade-in min-h-[100dvh] h-auto w-full bg-[#dad3d3] flex justify-center items-center flex-col gap-10 pt-20 pb-5">
			<div className={divs}>
				<h2 className={aboutHeader}>About this Website?</h2>
				<p className={`${text} text-[#b48829] `}>
					Well this isn't a fully developed website, this is a side
					project I've been working on, where basically you can
					download free images and save preferrences for later
					revisit.
				</p>
				<p className={`${text} text-[#b48829]`}>
					That being said not all pages are functional at least for
					now, It's still being worked on. especially the{" "}
					<b>Settings Page</b>
				</p>
			</div>
			<div className={divs}>
				<h2 className={aboutHeader}>Privacy</h2>
				<p className={`${text} text-[#cb2d2d]`}>
					<b className="text-[#00f]">Notice:</b> You won't receive an
					email from this website for any reason. So it's recommended
					that you use an invalid email as long as it ends with{" "}
					<i className="text-[#00f]">"@gmail.com"</i>. that being said
					using a valid email is pointless since you won't be
					receiving an email from this website. Ultimately, the choice
					is yours, but I would recommend not providing a real email
					address.Your information won't be shared with anyone but as
					a side project it's best to keep it simple #KIS 👌.
				</p>
			</div>
			<div className={divs}>
				<h2 className={aboutHeader}>Appreciation</h2>
				<p className={`${text} text-[#800080]`}>
					Even though this has been a lot of hard work, I would like
					to thank [@<b>PC4</b>] 💜💜💜💜💜 who was a catalyst in
					bringing this website to life. Thank you, [@<b>PC4</b>], you
					rock!
				</p>
			</div>
		</section>
	);
}

export default About;
