import {useEffect, useState} from 'react'

export function useResource ({ lang } = { lang: "en" }) {
    const [loading, setLoading] = useState(false)

    const [resume, setResume] = useState({})

    const handleLangClick = e => {
        e.preventDefault()
        localStorage.setItem('user-lang', e.target.lang)
      }

    const getResumeData = () => {
      return fetch("./lang/resumeData-" + lang + ".json")
        .then((res) => res.json())
    }

    useEffect(function () {
      setLoading(true)

      getResumeData()
        .then(resume => {
          setLoading(false)
          setResume(resume)
        })
    }, [handleLangClick, getResumeData])

    return {loading, resume}
}