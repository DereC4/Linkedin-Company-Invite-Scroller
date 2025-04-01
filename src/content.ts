(function() {
    'use strict';

    let autoClickEnabled = true;

    function clickShowMoreResults() {
        if (!autoClickEnabled) return;
        const button = document.querySelector<HTMLButtonElement>('button.artdeco-button.artdeco-button--muted.artdeco-button--1.artdeco-button--full.artdeco-button--secondary.ember-view.scaffold-finite-scroll__load-button');
        if (button) {
            button.click();
            console.log('Clicked "Show more results" button.');
        } else {
            console.log('"Show more results" button not found.');
        }
    }

    function observeChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && (node as HTMLElement).matches('button.artdeco-button.artdeco-button--muted.artdeco-button--1.artdeco-button--full.artdeco-button--secondary.ember-view.scaffold-finite-scroll__load-button')) {
                        clickShowMoreResults();
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    function createToggleButton() {
        const button = document.createElement('button');
        button.innerText = 'Auto-clicker ON';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.zIndex = '9999';
        button.style.padding = '10px';
        button.style.backgroundColor = '#0073b1';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

        button.addEventListener('click', () => {
            autoClickEnabled = !autoClickEnabled;
            button.innerText = autoClickEnabled ? 'Auto-clicker ON' : 'Auto-clicker OFF';
            console.log(`Auto-clicker ${autoClickEnabled ? 'enabled' : 'disabled'}.`);
        });

        return button;
    }

    function placeToggleButton() {
        const targetNode = document.getElementById('org-invite-to-follow-picker__header');
        if (targetNode) {
            if (!targetNode.querySelector('button[style*="position: fixed"]')) {
                const button = createToggleButton();
                targetNode.appendChild(button);
                console.log('Toggle button placed.');
            } else {
                console.log('Toggle button exists.');
            }
        } else {
            console.log('Target node for toggle button not found.');
        }
    }

    function observeToggleButtonPlacement() {
        const observer = new MutationObserver((mutations, obs) => {
            const targetNode = document.getElementById('org-invite-to-follow-picker__header');
            if (targetNode) {
                placeToggleButton();
                obs.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    observeChanges();
    observeToggleButtonPlacement();
})();