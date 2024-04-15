"use client";
import { useMemo, useState } from "react";
import HandleCommunities from "./CommunityHandler/CommunityHandler";
import HandleUsers from "./UserHandler/UserHandler";
import { Listbox, ListboxItem } from "@nextui-org/react";

const AdminPanel = () => {
	const [selectedKeys, setSelectedKeys] = useState<any>(
		new Set(["communities"])
	);

	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", "),
		[selectedKeys]
	);

	return (
		<div className="flex">
			<div className="flex flex-col gap-2 h-screen p-2 bg-primary text-gray-300">
				<h1 className="text-xl mt-2 mb-10">Admin Panel</h1>
				<div className="w-[260px] px-1 py-2">
					<Listbox
						aria-label="Single selection example"
						variant="flat"
						disallowEmptySelection
						selectionMode="single"
						selectedKeys={selectedKeys}
						onSelectionChange={setSelectedKeys}
					>
						<ListboxItem key="communities">Communities</ListboxItem>
						<ListboxItem key="users">Users</ListboxItem>
					</Listbox>
				</div>
			</div>
			<div className="w-3/4 mx-auto">
				{selectedValue === "communities" && <HandleCommunities />}
				{selectedValue === "users" && <HandleUsers />}
			</div>
		</div>
	);
};

export default AdminPanel;
