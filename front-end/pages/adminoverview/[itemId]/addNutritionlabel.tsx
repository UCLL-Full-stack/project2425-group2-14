import AddNutritionlabel from "@components/nutritionlabel/AddNutritionlabel"
import { Item } from "@types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ItemService from "@services/ItemsService";


const NutritionlabelForm: React.FC = () => {
    const params = useParams<{ itemId?: string }>();
    const itemId = params?.itemId;
    const [item, setItem] = useState<Item>();

    useEffect(() => {
        if (!itemId) return
        const fetchItem = async () => {
            try {
                const response = await ItemService.getItemById(String(itemId));
                const fetchedItem = await response.json();
                setItem(fetchedItem);
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        }

        fetchItem();
    }, [itemId]);

    return (
        <>
            <h1 className="text-center">Nutritionlabel form</h1>
            <section>
                {item && <AddNutritionlabel item={item} />}
            </section>
        </>
    )
}

export default NutritionlabelForm;