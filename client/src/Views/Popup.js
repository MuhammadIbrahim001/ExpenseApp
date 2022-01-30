import {
    Dialog,
    DialogContent,
    DialogTitle,
    makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        '--color-1': "#dfe9f3",
        '--color-2': ' #c2e9fb ',

        background: `
      linear-gradient(
        180deg,
        var(--color-1),
        var(--color-2) 80%
        
        
        
      )
    `,
        width: "25%",
        // paddingBottom: "20px",

        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
}));

export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();
    return (
        <Dialog
            open={openPopup}
            
            classes={{ paper: classes.dialogWrapper }}
        >
            <DialogTitle>
                <h5 >{title}</h5>
                <Close style={{ position: "absolute", right: 10, top: 10 }} onClick={() => { setOpenPopup(false) }} />
                <hr />
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
}
