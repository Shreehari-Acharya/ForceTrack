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

export function DayFilterContestSelector({ defaultFilter, onSelect }) {
    return (
        <Select value={defaultFilter} onValueChange={onSelect}>
            <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue>
                    {`Last ${defaultFilter} days`}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={30}>Last 30 days</SelectItem>
                <SelectItem value={90}>Last 90 days</SelectItem>
                <SelectItem value={365}>Last 365 days</SelectItem>
            </SelectContent>
        </Select>

    );
}

export function DayFilterProblemSelector({ defaultFilter, onSelect }) {
    return (
        <Select value={defaultFilter} onValueChange={onSelect}>
            <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue>
                    {`Last ${defaultFilter} days`}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={7}>Last 7 days</SelectItem>
                <SelectItem value={30}>Last 30 days</SelectItem>
                <SelectItem value={90}>Last 90 days</SelectItem>
            </SelectContent>
        </Select>
    );
}