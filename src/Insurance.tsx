import React, {FC, useEffect, useRef, useState} from "react"
import moment from "moment";
import {Avatar, Paper, Grid, Button, Typography , Box} from "@material-ui/core";
import {Skeleton} from '@material-ui/lab';
import { withStyles, WithStyles } from '@material-ui/core/styles';

interface InsuranceProps extends WithStyles<typeof style>{
  contract : {
    id: number
    userName: string,
    contractName: string,
    contractStatus: number,
    contractDescription: string,
    startAt: Date,
    endAt: Date,
  }
}
type State = "유지" | "해지" | "만기" | "변경"

const style = (theme:any) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  insuranceWrapper : {
    padding : 10,
    // height : "80%"
  },
  actionButton : {
    display : "block"
  },
  state2 : {
    cursor : "not-allowed"
  }
});


function checkState(stat:string) {
  const _stat = stat.split("").reverse().join("")
  if(_stat.charAt(1) == "1") {
    return "해지"
  } else if(_stat.charAt(3) == "1") {
    return "만기"
  } else if(_stat.charAt(2) == "1") {
    return "변경"
  } else if(_stat.charAt(0) == "1") {
    return "유지"
  }
  switch(stat.length) {
    case 1 : return "유지";
    case 2 : return "해지";
    case 3 : return "변경";
    case 4 : return "만기";
    default : throw Error("contractStatus Error")
  }
}
const Insurance:FC<InsuranceProps> = ({contract, classes}) => {
  const state:State =checkState(contract.contractStatus.toString(2));
  const isSpcState = ["유지", "변경"].indexOf(state) !== -1 ? true : false
  const [clickCount, setClickCount] = useState<number>(0);
  const wrapperRef = useRef(null)

  const state1 = {
    onClick : () => {
      alert(clickCount)
      setClickCount(clickCount+1)
    }
  }
  const state2 = {
    style : {
      cursor: "not-allowed"
    }
  }
  return (
      <Paper variant="outlined" className={classes.insuranceWrapper} {
        ...isSpcState ? {...state1} : {...state2}
      } >
        <Grid container spacing={2} >
          <Grid container item xs={1}  direction={"column"} alignItems="center" >
            <Grid item xs >
              <Skeleton><Avatar className={classes.avatar}/></Skeleton>
            </Grid>
            <Grid item xs>
              <Typography variant={"subtitle1"} >{contract.userName}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={6} direction={"column"}  >
            <Grid item container xs>
              <Grid item xs>
              <Typography variant={"h5"} >{contract.contractName}</Typography>
              </Grid>
              <Grid item xs>
              <Box display={"inline"} color="text.primary" borderRadius="25%" border={2} marginLeft={1}>{state}</Box>
              </Grid>
            </Grid>
            <Grid item xs>
              <Typography variant={"subtitle1"} noWrap>상품 설명 : {contract.contractDescription}</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant={"subtitle1"}>신청일 : {moment(contract.startAt).format("YYYY년 MM월 DD일")}</Typography>
            </Grid>

          </Grid>
          <Grid container item xs={3} direction={"column"}  justify="center">
            <Grid item>
              <Typography variant={"h6"}>?0,000원</Typography>
            </Grid>

          </Grid>
          {
            isSpcState ? <Grid container item xs={2} direction={"column"} justify="center">
              <Grid item >
                <Button variant="outlined" className={classes.actionButton}>해지</Button>
              </Grid>
              <Grid item >
                <Button variant="outlined" className={classes.actionButton}>변경</Button>
              </Grid>

            </Grid> : null
          }

        </Grid>

  </Paper>)

}

export default withStyles(style)(Insurance);
