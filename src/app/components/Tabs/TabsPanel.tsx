'use client'

import { useState, useRef, KeyboardEvent } from 'react';

type Props = {
  className: string,
  tabs: Tab[],
  getCurrentTab: (currentTab:string) => JSX.Element,
  getTabLabel?: Function,
}

function TabsPanel({ 
  className,
  tabs,
  getCurrentTab,
  getTabLabel 
}:Props) {
  const [currentTab, setCurrentTab] = useState(tabs[0].id)
  const tabContainerRef = useRef<HTMLDivElement>(null)
  
    
  /**
   * Indicate whether panel is visible
   *
   * @param {number} index - Index of panel to check
   * @returns {boolean} True if panel is visible
   */
  function isPanelVisible(tabId:string) {
    return tabId === currentTab
  }

  /**
   * Get unique id of panel to indicate controls of tab
   *
   * @param {number} index - Index of panel
   * @returns {string} Id of panel
   */
  function getTabId(index: number):string {
    return `tab-${index}`
  }

  /**
   * Focus last tab
   *
   * @returns {undefined}
   */
  function focusTab(index:number) {
    const tabContainerNode = tabContainerRef.current

    if(tabContainerNode) {
      const tabElements = tabContainerNode.querySelectorAll('button')

      tabElements[index].focus()
    }
  }

  function handleKeyDown(e:KeyboardEvent, index:number) {
    switch (e.key) {
      case 'Home':
        focusTab(0)
        break;
      case 'End':
        focusTab(tabs.length-1)
        break;
      case 'ArrowLeft':
        focusTab(index-1)
        break;
      case 'ArrowRight':
        focusTab(index+1)
        break;
    }
  }

  function handleClick(tabId: string): void {
    setCurrentTab(tabId)
  }

  return (
    <div ref={tabContainerRef} className={`${className} flex flex-col`}>
      <div className='flex border-b border-gray-300'>
        {
          tabs.map((tab, index) => (
            <button
              id={getTabId(index)}
              role="tab"
              aria-selected={isPanelVisible(tab.id)}
              aria-controls={getTabId(index)}
              tabIndex={isPanelVisible(tab.id) ? 0 : -1}
              className={`tab ${isPanelVisible(tab.id) ? 'activated' : ''}`} 
              key={tab.id}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={():void => handleClick(tab.id)}
            >
              {(getTabLabel && getTabLabel(tab)) || tab.label}
            </button>
          ))
        }
      </div>

      {
        tabs
        .filter(tab => isPanelVisible(tab.id))
        .map((tab, index) => (
          <div
            id={getTabId(index)}
            key={tab.id}
            className='py-5 px-3 bg-slate-100 flex-auto overflow-auto'
          >
            {
              getCurrentTab(currentTab) 
              || <div className='flex items-center justify-center'>No data to be displayed</div>
            } 
          </div>
        ))
      }
      
    </div>
  )
}

export default TabsPanel
