mq = require('ibmmq'); // import package containing MQI library
MQC = mq.MQC; // refer to constant values exported by the package.

mq.Conn("QM1", function(err,hConn) {
  if (err) {
    console.log(err);
  } else {
    console.log("MQCONN successful ");

    // Define what we want to open, and how we want to open it.
    od = new mq.MQOD();
    od.ObjectName = "SYSTEM.DEFAULT.LOCAL.QUEUE";
    openOptions = MQC.MQOO_OUTPUT;
    mq.Open(hConn,od,openOptions,function(err,hObj) {
      if (err) {
        console.log(err);
      } else {
        console.log("MQOPEN successful");
      }
    });
  }
});

msg = "Hello from Node at " + new Date();
mqmd = new mq.MQMD(); // Defaults are fine.
pmo = new mq.MQPMO();

mq.Put(hObj,mqmd,pmo,msg,function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("MQPUT successful");
  }
});