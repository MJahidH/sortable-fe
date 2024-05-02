

const highlightItem = (index,ttsHighlight,setTtsHighlight,fileContent) => {
    const newTtsHighlight = [...ttsHighlight];
    newTtsHighlight[index] = 3;
    setTtsHighlight([...newTtsHighlight]);

    setTimeout(() => {
      const originalState = Array(fileContent.length).fill(0);
      setTtsHighlight([...originalState])

    }, 900);
  };

  export default highlightItem