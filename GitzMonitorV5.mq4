//+------------------------------------------------------------------+
//|                                                  GitzMonitor.mq4 |
//|                                                          Zé Gitz |
//|                                            https://fb.com/zegitz |
//+------------------------------------------------------------------+
#property copyright "Zé Gitz"
#property link      "https://fb.com/zegitz"
#property version   "1.05"
#include "hash.mqh"
#include "json.mqh"
string INI;
extern string API ="http://pdmstore.com.br";
extern int novaConta = 0;
string versao = "GitzMonitor V5";
extern int add=2;
int inicio5;
int inicio10;
int inicio15;
int inicio20;
int inicio25;
int inicio30;
int inicio35;
int inicio40;
int inicio45;
int inicio50;
int inicio55;
int inicio60;

//+------------------------------------------------------------------+
//| Funções de Conta                                                 |
//+------------------------------------------------------------------+
double BuscaDeposito()
 {
  int total = OrdersHistoryTotal();
  double valor = 0;
   for(int i = 0; i < total; i++)
     {
      if(OrderSelect(i, SELECT_BY_POS, MODE_HISTORY) == false) continue;
      if(OrderType()==6 || OrderType()==7){
      valor += OrderProfit();
      }   
      }
   return(valor);  
 }
bool NewBar()
  {
   static datetime LastTime = 0;
   bool ret = Time[0] > LastTime && LastTime > 0;
   LastTime = Time[0];
   return(ret);
  }

bool timerCount(int seg)
  {
   static datetime inicial = Time[0];
   if(Time[0]- inicial == seg){
    bool ret = true;
    inicial = Time[0];
   }else{
     ret = false;
   }
   return(ret);
  }

 
void CriarConta() 
 {
   string s = "{\"accountnumber\":\""+AccountNumber()+"\",\"name\":\""+AccountName()+"\",\"credit\":\""+BuscaDeposito()+"\",\"balance\":\""+AccountInfoDouble(ACCOUNT_BALANCE)+"\",\"equity\":\""+AccountInfoDouble(ACCOUNT_EQUITY)+"\",\"marginfree\":\""+NormalizeDouble(AccountInfoDouble(ACCOUNT_MARGIN_FREE),2)+"\",\"marginlevel\":\""+NormalizeDouble(AccountInfoDouble(ACCOUNT_MARGIN_LEVEL),2)+"\",\"status\":\""+IsExpertEnabled()+"\",\"data\":\""+TimeLocal()+"\"}";
    JSONParser *parser = new JSONParser();
    JSONValue *jv = parser.parse(s);                                                                               
         string   ReqSERVER_URL = API+"/account/create.php",              // ---- MQL4 WebRequst
                  ReqCOOKIE     =  NULL,
                  ReqHEADERs    = "Content-Type: application/json\r\n";
          int     ReqTIMEOUT    =  5000;
          char    POSTed_DATA[],
                  result_RECVed_DATA_FromSERVER[];
          int     result_RetCODE;
          string  result_DecodedFromSERVER,
                  result_RECVed_HDRs_FromSERVER;
        ArrayResize(POSTed_DATA,StringToCharArray( jv.toString(),POSTed_DATA,0,WHOLE_ARRAY,CP_UTF8)-1);
          ResetLastError();
          result_RetCODE = WebRequest( "POST",
                                       ReqSERVER_URL,
                                       ReqHEADERs,
                                       ReqTIMEOUT,
                                       POSTed_DATA,
                                       result_RECVed_DATA_FromSERVER,
                                       result_RECVed_HDRs_FromSERVER
                                       );
                            
            if (  result_RetCODE == -1 ) Print( "Error in WebRequest. Error code  =", GetLastError() ); // returns error 4060 – "Function is not allowed for call" unless permitted -- ref. Picture in >>> https://stackoverflow.com/questions/39954177/how-to-send-a-post-with-a-json-in-a-webrequest-call-using-mql4
          else {
                for (  int i = 0; i < ArraySize( result_RECVed_DATA_FromSERVER ); i++ ) {
                       if (  ( result_RECVed_DATA_FromSERVER[i] == 10 ) // == '\n'  // <LF>
                          || ( result_RECVed_DATA_FromSERVER[i] == 13 ) // == '\r'  // <CR>
                          ) 
                          continue;
                       else     result_DecodedFromSERVER += CharToStr( result_RECVed_DATA_FromSERVER[i] );
                }
                
                  delete jv;
                  delete parser;
               // Print( "DATA:: ", result_DecodedFromSERVER );
               // Print( "HDRs:: ", result_RECVed_HDRs_FromSERVER );
          }                            
         // Print(result_RetCODE);
          //for (  int x = 0; x < ArraySize( teste ); x++ ) {
          //printf(CharToStr(teste[x]));
          //}
         // Print("Error in FileOpen. Error code=",GetLastError());  ResetLastError();
 }
void ProcuraConta()
 {
   string s = "{\"accountnumber\":\""+AccountNumber()+"\"}";
    JSONParser *parser = new JSONParser();
    JSONValue *jv = parser.parse(s);                                                                               
         string   ReqSERVER_URL = API+"/account/search.php",              // ---- MQL4 WebRequst
                  ReqCOOKIE     =  NULL,
                  ReqHEADERs    = "Content-Type: application/json\r\n";
          int     ReqTIMEOUT    =  5000;
          char    POSTed_DATA[],
                  result_RECVed_DATA_FromSERVER[];
          int     result_RetCODE;
          string  result_DecodedFromSERVER,
                  result_RECVed_HDRs_FromSERVER;
        ArrayResize(POSTed_DATA,StringToCharArray( jv.toString(),POSTed_DATA,0,WHOLE_ARRAY,CP_UTF8)-1);
          ResetLastError();
          result_RetCODE = WebRequest( "POST",
                                       ReqSERVER_URL,
                                       ReqHEADERs,
                                       ReqTIMEOUT,
                                       POSTed_DATA,
                                       result_RECVed_DATA_FromSERVER,
                                       result_RECVed_HDRs_FromSERVER
                                       );
                            
            if (  result_RetCODE == -1 ) Print( "Error in WebRequest. Error code  =", GetLastError() ); // returns error 4060 – "Function is not allowed for call" unless permitted -- ref. Picture in >>> https://stackoverflow.com/questions/39954177/how-to-send-a-post-with-a-json-in-a-webrequest-call-using-mql4
          else {
          
          string resultado = CharArrayToString(result_RECVed_DATA_FromSERVER);
          //Print(resultado);
          if(StringFind(resultado,"{\"id\":\"")==1)
        {
         int res     =StringFind(resultado,"\"id\":\"",0);
         printf(res);
         //filename=StringSubstr(str,8,res-8);
         novaConta  = 1;
         }else{CriarConta();}}
              //  for (  int i = 0; i < ArraySize( result_RECVed_DATA_FromSERVER ); i++ ) {
                 //      if (  ( result_RECVed_DATA_FromSERVER[i] == 10 ) // == '\n'  // <LF>
                  //        || ( result_RECVed_DATA_FromSERVER[i] == 13 ) // == '\r'  // <CR>
                  //        ) 
                 //         continue;
                //       else     
                       
                //      result_DecodedFromSERVER += CharToStr( result_RECVed_DATA_FromSERVER[i] );
             //   }
                //printf(result_DecodedFromSERVER.getString("id"));
                //Print( "DATA:: ", result_DecodedFromSERVER );
               // Print( "HDRs:: ", result_RECVed_HDRs_FromSERVER );
        //  }                            
          //Print(result_RetCODE);
          //for (  int x = 0; x < ArraySize( teste ); x++ ) {
          //printf(CharToStr(teste[x]));
          //}
         // Print("Error in FileOpen. Error code=",GetLastError());  ResetLastError();
                  delete jv;
                  delete parser;  
 }
void AtualizaConta()
 {
   string s = "{\"accountnumber\":\""+AccountNumber()+"\",\"name\":\""+AccountName()+"\",\"credit\":\""+BuscaDeposito()+"\",\"balance\":\""+AccountInfoDouble(ACCOUNT_BALANCE)+"\",\"equity\":\""+AccountInfoDouble(ACCOUNT_EQUITY)+"\",\"marginfree\":\""+NormalizeDouble(AccountInfoDouble(ACCOUNT_MARGIN_FREE),2)+"\",\"marginlevel\":\""+NormalizeDouble(AccountInfoDouble(ACCOUNT_MARGIN_LEVEL),2)+"\",\"status\":\""+IsExpertEnabled()+"\",\"data\":\""+TimeLocal()+"\",\"versao\":\""+versao+"\"}";
    JSONParser *parser = new JSONParser();
    JSONValue *jv = parser.parse(s);                                                                               
         string   ReqSERVER_URL = API+"/account/update1.php",              // ---- MQL4 WebRequst
                  ReqCOOKIE     =  NULL,
                  ReqHEADERs    = "Content-Type: application/json\r\n";
          int     ReqTIMEOUT    =  5000;
          char    POSTed_DATA[],
                  result_RECVed_DATA_FromSERVER[];
          int     result_RetCODE;
          string  result_DecodedFromSERVER,
                  result_RECVed_HDRs_FromSERVER;
        ArrayResize(POSTed_DATA,StringToCharArray( jv.toString(),POSTed_DATA,0,WHOLE_ARRAY,CP_UTF8)-1);
          ResetLastError();
          result_RetCODE = WebRequest( "POST",
                                       ReqSERVER_URL,
                                       ReqHEADERs,
                                       ReqTIMEOUT,
                                       POSTed_DATA,
                                       result_RECVed_DATA_FromSERVER,
                                       result_RECVed_HDRs_FromSERVER
                                       );
                            
            if (  result_RetCODE == -1 ) Print( "Error in WebRequest. Error code  =", GetLastError() ); // returns error 4060 – "Function is not allowed for call" unless permitted -- ref. Picture in >>> https://stackoverflow.com/questions/39954177/how-to-send-a-post-with-a-json-in-a-webrequest-call-using-mql4
          else {
          
          
                for (  int i = 0; i < ArraySize( result_RECVed_DATA_FromSERVER ); i++ ) {
                       if (  ( result_RECVed_DATA_FromSERVER[i] == 10 ) // == '\n'  // <LF>
                          || ( result_RECVed_DATA_FromSERVER[i] == 13 ) // == '\r'  // <CR>
                          ) 
                          continue;
                       else     result_DecodedFromSERVER += CharToStr( result_RECVed_DATA_FromSERVER[i] );
                }
              
                  delete jv;
                  delete parser;
                //Print( "DATA:: ", result_DecodedFromSERVER );
                //Print( "HDRs:: ", result_RECVed_HDRs_FromSERVER );
          }                            
         // Print(result_RetCODE);
          //for (  int x = 0; x < ArraySize( teste ); x++ ) {
          //printf(CharToStr(teste[x]));
          //}
         // Print("Error in FileOpen. Error code=",GetLastError());  ResetLastError();

 }

//+------------------------------------------------------------------+
//| Funções de Ordens                                                |
//+------------------------------------------------------------------+
void FechaTudo(){}
void FechaOrdem(){}
void AbreOrdem(){} 
void AlteraTP(){}
void AlteraSL(){}
void AtualizaOrdens()
 {
   int total = OrdersTotal();
   string s;
   for(int z = 0; z < total; z++)
    {
      if(OrderSelect(z, SELECT_BY_POS, MODE_TRADES) == false) continue;
        if(z == 0){
           s = "{\"lista\":[{\"orderid\":\""+OrderTicket()+"\",\"account\":\""+AccountNumber()+"\",\"ativo\":\""+OrderSymbol()+"\",\"lot\":\""+OrderLots()+"\",\"price\":\""+OrderOpenPrice()+"\",\"type\":\""+OrderType()+"\",\"sl\":\""+OrderStopLoss()+"\",\"tp\":\""+OrderTakeProfit()+"\",\"balance\":\""+OrderProfit()+"\",\"datetime\":\""+TimeLocal()+"\"},";
       //Print(OrderTicket());
        }
        if(z > 0 && z <= total -2){
             s += "{\"orderid\":\""+OrderTicket()+"\",\"account\":\""+AccountNumber()+"\",\"ativo\":\""+OrderSymbol()+"\",\"lot\":\""+OrderLots()+"\",\"price\":\""+OrderOpenPrice()+"\",\"type\":\""+OrderType()+"\",\"sl\":\""+OrderStopLoss()+"\",\"tp\":\""+OrderTakeProfit()+"\",\"balance\":\""+OrderProfit()+"\",\"datetime\":\""+TimeLocal()+"\"},";
        //Print(OrderTicket()); 
          }
        if(z == total -1){
             s += "{\"orderid\":\""+OrderTicket()+"\",\"account\":\""+AccountNumber()+"\",\"ativo\":\""+OrderSymbol()+"\",\"lot\":\""+OrderLots()+"\",\"price\":\""+OrderOpenPrice()+"\",\"type\":\""+OrderType()+"\",\"sl\":\""+OrderStopLoss()+"\",\"tp\":\""+OrderTakeProfit()+"\",\"balance\":\""+OrderProfit()+"\",\"datetime\":\""+TimeLocal()+"\"}]}";
        // Print(OrderTicket());
          } 
          
    }
              JSONParser *parser = new JSONParser();
              JSONValue *jv = parser.parse(s);                                                                               
         string   ReqSERVER_URL = API+"/order/sinc.php",              // ---- MQL4 WebRequst
                  ReqCOOKIE     =  NULL,
                  ReqHEADERs    = "Content-Type: application/json\r\n";
          int     ReqTIMEOUT    =  5000;
          char    POSTed_DATA[],
                  result_RECVed_DATA_FromSERVER[];
          int     result_RetCODE;
          string  result_DecodedFromSERVER,
                  result_RECVed_HDRs_FromSERVER;
        ArrayResize(POSTed_DATA,StringToCharArray( jv.toString(),POSTed_DATA,0,WHOLE_ARRAY,CP_UTF8)-1);
          ResetLastError();
          result_RetCODE = WebRequest( "POST",
                                       ReqSERVER_URL,
                                       ReqHEADERs,
                                       ReqTIMEOUT,
                                       POSTed_DATA,
                                       result_RECVed_DATA_FromSERVER,
                                       result_RECVed_HDRs_FromSERVER
                                       );
                            
            if (  result_RetCODE == -1 ) Print( "Error in WebRequest. Error code  =", GetLastError() );
          else {
                for (  int i = 0; i < ArraySize( result_RECVed_DATA_FromSERVER ); i++ ) {
                       if (  ( result_RECVed_DATA_FromSERVER[i] == 10 ) // == '\n'  // <LF>
                          || ( result_RECVed_DATA_FromSERVER[i] == 13 ) // == '\r'  // <CR>
                          ) 
                          continue;
                       else     result_DecodedFromSERVER += CharToStr( result_RECVed_DATA_FromSERVER[i] );
  
                }
                
                  delete jv;
                  delete parser;
                Print( "DATA:: ", result_DecodedFromSERVER );
                Print( "HDRs:: ", result_RECVed_HDRs_FromSERVER );
          }                            
         // Print(result_RetCODE);
          //for (  int x = 0; x < ArraySize( teste ); x++ ) {
          //printf(CharToStr(teste[x]));
          //}
         // Print("Error in FileOpen. Error code=",GetLastError());  ResetLastError();
 }
//+------------------------------------------------------------------+
//| Funções de Expert                                                |
//+------------------------------------------------------------------+

void LigaDesligaEA(){}

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
  {
   
   return(INIT_SUCCEEDED);

  }
//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {

   
  }
//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
int teste = TimeLocal();

if(NewBar()){
inicio5 = teste+5;
inicio10 = teste+10;
inicio15 = teste+15;
inicio20 = teste+20;
inicio25 = teste+25;
inicio30 = teste+30;
inicio35 = teste+35;
inicio40 = teste+40;
inicio45 = teste+45;
inicio50 = teste+50;
inicio55 = teste+55;
inicio60 = teste+60;
printf("Início de timer");

}
  if(novaConta == 0){
  ProcuraConta();
   }
if(teste >= inicio5 && teste <= inicio5+add){
   AtualizaConta();
   printf("teste 5");
     if(OrdersTotal()>0)
    {
      AtualizaOrdens();
    }
} 
if(teste >= inicio10 && teste <= inicio10+add){
   AtualizaConta();
    printf("teste 10");
     if(OrdersTotal()>0)
    {
      AtualizaOrdens();
    }
} 
if(teste >= inicio20 && teste <= inicio20+add){
   AtualizaConta();
   printf("teste 20");
     if(OrdersTotal()>0)
    {
      AtualizaOrdens();
    }
} 
if(teste >= inicio30 && teste <= inicio30+add){
   AtualizaConta();
   printf("teste 30");
     if(OrdersTotal()>0)
    {
      AtualizaOrdens();
    }
} 
if(teste >= inicio40 && teste <= inicio40+add){
   AtualizaConta();
    printf("teste 40");
     if(OrdersTotal()>0)
    {
      AtualizaOrdens();
    }
} 
if(teste >= inicio50 && teste <= inicio50+add){
   AtualizaConta();
     printf("teste 50");
     if(OrdersTotal()>0)
    {
      AtualizaOrdens();
    }
} 
if(teste >= inicio60 && teste <= inicio60+add){
   AtualizaConta();
     printf("teste 60");
     if(OrdersTotal()>0)
    {
      AtualizaOrdens();
    }
} 

}
//+------------------------------------------------------------------+

