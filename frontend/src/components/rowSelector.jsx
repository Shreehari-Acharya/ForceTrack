import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function RowSelector({ defaultNumberOfRows, onSelect }) {
    return (
        <Select value={defaultNumberOfRows} onValueChange={onSelect}>
            <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
                {[...Array(6)].map((_, idx) => {
                    const i = (idx + 1) * 5;
                    return (
                        <SelectItem key={i} value={i}>
                            {i}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}