function selectTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
    	tab.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`.tab[onclick*="${tabId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    document.querySelectorAll('.content').forEach(content => {
    	content.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
}
