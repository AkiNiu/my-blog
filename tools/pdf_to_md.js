const fs = require('fs')
const path = require('path')
let pdfParse

async function main() {
    const inputPath = process.argv[2]
    const outputPathArg = process.argv[3]
    if (!inputPath) {
        console.error('用法: node tools/pdf_to_md.js <input.pdf> [output.md]')
        process.exit(1)
    }
    if (!pdfParse) {
        const m = await import('pdf-parse')
        pdfParse = m.default || m.pdfParse || m
    }
    const absInput = path.resolve(inputPath)
    if (!fs.existsSync(absInput)) {
        console.error(`找不到文件: ${absInput}`)
        process.exit(1)
    }
    const buffer = fs.readFileSync(absInput)
    const data = await pdfParse(buffer)
    const baseName = path.basename(absInput, path.extname(absInput))
    const outPath = path.resolve(outputPathArg || path.join(path.dirname(absInput), `${baseName}.md`))

    const lines = normalizeText(data.text)
    const md = buildMarkdown({
        title: baseName,
        source: absInput,
        numpages: data.numpages,
        info: data.info || {},
        metadata: data.metadata || {},
        lines
    })
    fs.writeFileSync(outPath, md, 'utf8')
    console.log(outPath)
}

function normalizeText(text) {
    const t = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    const rawLines = t.split('\n').map(s => s.trim())
    const lines = []
    for (const s of rawLines) {
        if (!s) continue
        lines.push(s)
    }
    return lines
}

function buildMarkdown({ title, source, numpages, info, metadata, lines }) {
    const header = [
        `# ${title}`,
        '',
        `- 来源文件: \`${source}\``,
        `- 页数: ${numpages}`,
    ]
    if (info && (info.Producer || info.CreationDate || info.Author || info.Title)) {
        header.push('', '**PDF元信息**')
        if (info.Title) header.push(`- 标题: ${info.Title}`)
        if (info.Author) header.push(`- 作者: ${info.Author}`)
        if (info.Producer) header.push(`- 生成器: ${info.Producer}`)
        if (info.CreationDate) header.push(`- 创建时间: ${info.CreationDate}`)
    }
    const body = ['','**全文内容**','']
    for (const s of lines) {
        body.push(s)
    }
    return [...header, ...body].join('\n')
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})

