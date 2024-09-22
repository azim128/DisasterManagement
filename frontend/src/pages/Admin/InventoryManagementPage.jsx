import AddInventoryItem from "../../components/admin/AddInventoryItem";
import AdminInventoryList from "../../components/admin/AdminInventoryList";

export default function InventoryManagementPage() {
    return (
        <div>
            <AddInventoryItem />
            <AdminInventoryList />
        </div>
    );
}
