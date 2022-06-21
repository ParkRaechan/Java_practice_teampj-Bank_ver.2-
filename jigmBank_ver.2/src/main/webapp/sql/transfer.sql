create table teampj_bank.transfer(
   trfno int primary key auto_increment,
   trfamount int,
   trftime varchar(21),
   achostno varchar(14),
   acguestno varchar(14)
);