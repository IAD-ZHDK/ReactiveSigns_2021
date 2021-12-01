public final class CSVDataStore{

  private Table table;
  private String file = "lowHigh.csv";
  
public CSVDataStore() {
    println("loading table...");
    table = loadTable("data/"+file, "header");
    //
     if (table == null) {
      // if there is no file yet, create a new one
      println("no csv file found");
      makeFile();
    } else {
      // sort the data
      println("csv file found");
      for (TableRow row : table.rows()) {
        lowDistance = row.getFloat("low");
        highDistance = row.getFloat("high");
         println(lowDistance);
         println(highDistance);
      }
    }
  }
   private void makeFile() {
    table = new Table();
    table.addColumn("low");
    table.addColumn("high");
    saveTable(table, "data/"+file);
    TableRow  newRow = table.getRow(0);
    newRow.setFloat("low", lowDistance);
    newRow.setFloat("high", highDistance);
    saveTable(table, "data/"+file);
  }
  
  
   public void saveData() {
    // save a new entry into the csv file
 
    for (TableRow row : table.rows()) {
      row.setFloat("low", lowDistance);
      row.setFloat("high", highDistance);
    }
    saveTable(table, "data/"+file);
    println("saved");
  }

}
