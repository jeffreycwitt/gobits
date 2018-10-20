import React from 'react'

const ImportExport = (props) =>{
  const handleFileImport = (e) => {
    var reader = new FileReader();

    reader.readAsText(e.target.files[0]);

    // define callback function; aka actions to be peerformed after file is read
    reader.onload = function(e) {
      var text = reader.result;
      props.handleImportState(text)
    }


  }
  const packageData = () =>
   {
    const data = JSON.stringify(props.currentState, null, 2);
    const dataLink = "data:application/json;charset=utf-8," + encodeURI(data)
    return dataLink
  }
  const downloadTitle = () =>
   {
    const title = "GobitsState-" + new Date().toISOString().slice(0, 10)
    return title
  }
  return (
    <div>
      <a href={packageData()} download={downloadTitle()}>Download State</a> |
      Import State <input type="file" id="files" name="files[]" onChange={handleFileImport}/>
    </div>
  );
}

export default ImportExport
