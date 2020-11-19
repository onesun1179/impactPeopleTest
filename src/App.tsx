import React, {FormEvent, useCallback, useState, FC} from 'react';
import logo from './logo.svg';
import './App.css';
import mockHttpClient from "./mockHttClient";
import moment from "moment"
import {
  TextField,
  Container,
  Button,
  GridList,
  GridListTile,
  Grid,
  CircularProgress,
  Box,
  Typography,
} from "@material-ui/core";
import Insurance from "./Insurance"
import { Skeleton } from '@material-ui/lab';
import { withStyles, WithStyles } from '@material-ui/core/styles';

interface AppProps extends WithStyles<typeof style> {

}


const style = (theme:any) => ({
    body: {
        padding : theme.spacing(1)
    },

});

const App:FC<AppProps> = ({classes}) => {
  const [startAt, setStartAt] = useState<string>(moment().format("YYYY-MM-DD"))
  const [endAt, setEndAt] = useState<string>(moment().format("YYYY-MM-DD"))
  const [insuranceList, setInsuranceList] = useState([]);
  const [netErrorCount, setNetErrorCount] = useState(0)
  const onSubmit = useCallback(async () => {
      let errorCount = 0;
      async function submit() {
        mockHttpClient.getContracts({
          startAt : moment(startAt).toDate(),
          endAt : moment(endAt).toDate()
        }).then(result => {
          setNetErrorCount(0)
          setInsuranceList(result)
        }).catch((e) => {

          errorCount++;
          setNetErrorCount(errorCount)

          const asyncTime = setTimeout(async () => {
            await submit()
          }, 1000)

          if(errorCount > 3) {
            clearTimeout(asyncTime)
            alert("재시도 횟수 초과 !")
            setNetErrorCount(0)
            setInsuranceList([])
          }
        })

      }
      await submit()

  }, [startAt, endAt])

    console.log(netErrorCount)
  return (
     <Container maxWidth={"md"} className={classes.body}>

         <Grid container spacing={1}>
             <Grid container item justify="space-between" alignItems="flex-end">
                 <Grid item>
                     <TextField
                         label="조회 시작일"
                         name={"startAt"}
                         type="date"
                         value={startAt}
                         onChange={(e) => {setStartAt(e.target.value)}}
                         InputLabelProps={{
                           shrink: true,
                         }}
                     />
                     <TextField
                         label="조회 종료일"
                         name={"endAt"}
                         type="date"
                         value={endAt}
                         onChange={(e) => {setEndAt(e.target.value)}}
                         InputLabelProps={{
                           shrink: true,
                         }}
                     />
                 </Grid>
                 <Grid item>
                     <Button onClick={onSubmit} variant="outlined">검색</Button>
                 </Grid>

             </Grid>
           <Grid item container alignItems={"center"} justify={"center"}>
             <Grid item >
           {
             netErrorCount > 0
               ? (
                 <>
                  <CircularProgress color="secondary"/>
                  <Typography variant={"subtitle1"} >{netErrorCount} / 3</Typography>
                 </>
             )
             :
               <GridList cellHeight={120} cols={1} spacing={1}>
                 {insuranceList.map((insurance, key) =>
                   <GridListTile key={key} component={"li"}>
                     <Insurance contract={insurance}></Insurance>
                   </GridListTile>)}
               </GridList>
           }
             </Grid>
           </Grid>
         </Grid>
     </Container>

  );
}

export default withStyles(style)(App);
