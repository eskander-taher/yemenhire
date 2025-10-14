import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Heart, Sparkles, Shield } from "lucide-react"
import Image from "next/image";

interface FooterProps {
	locale: string;
	dict: any;
}

export function Footer({ locale, dict }: FooterProps) {
	const isRTL = locale === "ar";

	const quickLinks = [
		{ name: dict.nav.home, href: `/${locale}` },
		{ name: dict.nav.jobs, href: `/${locale}/jobs` },
		{ name: dict.nav.tenders, href: `/${locale}/tenders` },
		{ name: dict.nav.advertise, href: `/${locale}/advertise` },
	];

	const socialLinks = [
		{ name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-500" },
		{ name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-500" },
		{ name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
	];

	return (
		<footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
			<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

			{/* Decorative elements */}
			<div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
			<div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
					{/* Brand */}
					<div className="col-span-1 md:col-span-2">
						<Link
							href={`/${locale}`}
							className="flex items-center space-x-3 rtl:space-x-reverse mb-6 group"
						>
							<div className="relative">
								<div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
									<Image
										src="/yemenhires_logo_short.png"
										alt="YemenHire Logo"
										width={40}
										height={40}
										className="object-contain w-auto h-auto"
										priority
									/>
								</div>
							</div>
							<span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
								YemenHires
							</span>
						</Link>

						<p className="text-gray-300 mb-6 max-w-md leading-relaxed text-lg">
							{dict.footer.description}
						</p>

						<div className="flex space-x-4 rtl:space-x-reverse">
							{socialLinks.map((social) => {
								const Icon = social.icon;
								return (
									<a
										key={social.name}
										href={social.href}
										className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
										aria-label={social.name}
									>
										<Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
									</a>
								);
							})}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-xl font-bold mb-6 text-white">
							{dict.footer.quickLinks}
						</h3>
						<ul className="space-y-3">
							{quickLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className="text-xl font-bold mb-6 text-white">{dict.footer.contact}</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300 group">
								<div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
									<Mail className="w-4 h-4" />
								</div>
								<span>info@yemenhires.com</span>
							</div>
							<div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300 group">
								<div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
									<Phone className="w-4 h-4" />
								</div>
								<span dir="ltr">+967771217267</span>
							</div>
							<div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300 group">
								<div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
									<Phone className="w-4 h-4" />
								</div>
								<span>02328798</span>
							</div>
							<div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300 group">
								<div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
									<MapPin className="w-4 h-4" />
								</div>
								<span>Aden, Yemen</span>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-gray-700 mt-12 pt-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-gray-400 flex items-center space-x-2 rtl:space-x-reverse">
							<span>&copy; 2025 YemenHires. {dict.footer.rights}</span>
							<Heart className="w-4 h-4 text-red-500 animate-pulse" />
							<span>Made with love in Yemen</span>
						</p>
						
						{/* Admin Access Button */}
						<Link
							href="/admin"
							className="group flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-gray-800/50 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
						>
							<Shield className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
							<span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">
								Admin Panel
							</span>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
