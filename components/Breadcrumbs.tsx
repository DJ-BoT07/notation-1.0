"use client";

import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

function Breadcrumbs() {
	const path = usePathname();
	//http://localhost:3000/doc/9l3BeLyaqta6RkeJwOo0
	const segments = path.split("/");
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
	
	
				{segments.map((segment, index) => {
					if (!segment) return null;
					const href = `/${segments.slice(0, index + 1).join("/")}`;
					const isLast = index === segments.length - 1;
	
					return (
						<Fragment key={segment}>
							<BreadcrumbSeparator />
						<BreadcrumbItem key={segment}>
						{isLast ? (
							<BreadcrumbPage>{segment}</BreadcrumbPage>
						) : (
							<BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
						)}
						</BreadcrumbItem>
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
export default Breadcrumbs;
