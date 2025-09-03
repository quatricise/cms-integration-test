/* CMS logic design, in TS, but could be in a different language. */

function $h(query: string): HTMLElement {
  const element = document.querySelector(query)
  if(!element || element instanceof HTMLElement === false) throw new Error("$h: No HTMLElement found by query: " + query)
  return element as HTMLElement
}

function $ha(query: string, errorOnMiss: boolean = true): HTMLElement[] {
  const elements = Array.from(document.querySelectorAll(query))
  if(!elements || elements.length === 0 || elements.every(e => e instanceof HTMLElement) === false) {
    if(errorOnMiss) {
      throw new Error("$ha: No HTMLElements found by query: " + query)
    } else {
      return []
    }
  }
  return elements
}

function camelToDashed(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

const attributes = [
  "cms",
  "cmsUseChildren",
  "cmsUseSelf",
  "cmsChildrenQuery",
  "cmsSrc",
  "cmsType",
  "cmsOverflow",
  "cmsUnderflow",
  "cmsScripts",
] as const

type Attribute = (typeof attributes)[number]

const pluginQuery = ".section.section--carousel" //the surrounding element that is the CMS's "Plugin"

const targets = $ha(`${pluginQuery} *[data-cms=true]`)

const plausibleTargets = (function () { //looks for elements that could be targets for the cms but are missing the trigger attribute 'cms'
  const reducedAttributes = attributes.filter(a => a !== "cms")
  return reducedAttributes.map(a => {
    return $ha(`*[data-${camelToDashed(a)}]:not([data-cms=true])`, false)
  }).flat(1)
})();

if(plausibleTargets.length) {
  console.warn(`(i) Plausible targets for CMS integration found. Did you mean to attach 'data-cms=true' on any of them? \n\n`)
  console.warn(`Targets: \n`)
  console.warn(plausibleTargets)
}

targets.forEach(child => {
  const childAttributes = Object.entries(child.dataset).map(entry => {return {key: entry[0], value: entry[1] ?? ""}})
  console.log(childAttributes)

  childAttributes.forEach(attribute => {

    //this needs logic - in which order is this stuff executed. I feel like a switch might not be a good solution.
    switch(attribute.key as Attribute) {
      case "cms": {

        break
      }
      case "cmsUseChildren": {

        break
      }
      case "cmsUseSelf": {
        console.log("Uses self, fill this with the src attrib.")
        break
      }        
      case "cmsChildrenQuery": {

        break
      }        
      case "cmsSrc": {

        break
      }        
      case "cmsType": {

        break
      }        
      case "cmsOverflow": {

        break
      }        
      case "cmsUnderflow": {

        break
      }        
      case "cmsScripts": {

        break
      }    
      default: {
        const _exhaustiveCheck: never = attribute.key //@todo kinda fix this exhaustive check
        throw new Error(`Element data-cms attribute does not exist: '${camelToDashed(attribute.key)}' \n(i) All available properties are: \n${attributes.map(a => camelToDashed(a)).join(", ")}`)
      }
    }
  })
})