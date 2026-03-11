import { Button } from '@/components/ui/button'

type EditLocationCancelButtonProps = {
    onCancel: () => void
}

export const EditLocationCancelButton = ({ onCancel }: EditLocationCancelButtonProps) => {
    return (
        <Button variant="minor" onPress={onCancel}>
            Cancel
        </Button>
    )
}
