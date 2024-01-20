import {
	Dialog,
	DialogBody,
	DialogDescription,
	DialogTitle,
	DialogActions,
  } from "components/dialog";
  import {Button} from 'components'

  interface BlockDialogProps {
	open: boolean;
	setOpen: (open: boolean) => void;
  }


function BlockDialog({open, setOpen}: BlockDialogProps) {
	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>
			</DialogTitle>
			<DialogBody>
				<DialogDescription>
				</DialogDescription>
			</DialogBody>
			<DialogActions>
				<Button>Cancel</Button>
				<Button>Confirm</Button>
			</DialogActions>
		</Dialog>
	)
}

export default BlockDialog;