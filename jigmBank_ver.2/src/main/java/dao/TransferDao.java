package dao;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import dto.Transfer;

public class TransferDao extends Dao{

	public TransferDao() {
		super();
	}

	// 호출용
	public static TransferDao transferDao = new TransferDao();
	public static TransferDao gettranTransferDao() {return transferDao;}

	
	public int finalconfirm(String accnumr,String pww22) {
		
		String sql = "select * from account where acno='"+accnumr+"'";
		try {
			ps = con.prepareStatement(sql);
			rs = ps.executeQuery();

			if(rs.next()) {
				String asd = rs.getString(10);

				sql = "select * from otp where otpno = '"+asd+"' and otpactive='"+pww22+"'";
				ps = con.prepareStatement(sql);
				rs = ps.executeQuery();

				if(rs.next()) {
					return 1;
					
				}
			}
		}
		catch (Exception e) { System.out.println( e );}
		return 2;
	}
	
	
	
	public int transferla(String accnumr1,String accnumr2,String money) {
		
		String sql = "select acbalance from account where acno='"+accnumr1+"'";
		try {
			ps = con.prepareStatement(sql);
			rs = ps.executeQuery();
			
			if(rs.next()) {
				int ymny1 = rs.getInt(1);
				int money1 = Integer.parseInt(money);
				int ymny2 = ymny1 - money1;
				
				sql = "update account set acbalance ='"+ymny2+"' where acno = '"+accnumr1+"'";
				ps = con.prepareStatement(sql);
				ps.executeUpdate();
				trrecord(accnumr1,accnumr2,money);
				return 1;
				
			}
		}
		catch (Exception e) { System.out.println( e );}
		return 2;
	}
	
	
	
	public int transferrd(String accnumr1,String accnumr2,String money) {
	
		String sql = "select acbalance from account where acno='"+accnumr2+"'";
		try {
			ps = con.prepareStatement(sql);
			rs = ps.executeQuery();
			
			if(rs.next()) {
				int ymny331 = rs.getInt(1);
				int money141 = Integer.parseInt(money);
				int ymny4 = ymny331+money141;
				
				sql = "update account set acbalance ='"+ymny4+"' where acno = '"+accnumr2+"'";
				ps = con.prepareStatement(sql);
				ps.executeUpdate();
				return 1;
				
			}
		}
		catch (Exception e) { System.out.println( e );}
		return 2;
		}
	
	
	
	public void trrecord(String accnumr1,String accnumr2,String money) {
		
		LocalDateTime now = LocalDateTime.now();   
		String currentDateTime = now.format(DateTimeFormatter.ofPattern("yyyy/MM/dd-hh:mm:ss"));
		
		int money998 = Integer.parseInt(money);
		
		Transfer transfer = new Transfer(0,money998,currentDateTime,accnumr1,accnumr2);
		
		String sql = "insert into transfer(trfno,trfamount,trftime,achostno,acguestno) values(?,?,?,?,?)";
		try {
			ps = con.prepareStatement(sql);
			ps.setInt(1, transfer.getTrfno() );
			ps.setInt(2, transfer.getTrfamount() );
			ps.setString(3, transfer.getTrftime() );
			ps.setString(4, transfer.getAchostno() );
			ps.setString(5, transfer.getAcguestno() );
			ps.executeUpdate();
			
			
		}catch (Exception e) { System.out.println( e );}
		}
		
}
