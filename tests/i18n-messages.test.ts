import { describe, it, expect } from 'vitest';
import es from '@/messages/es.json';
import en from '@/messages/en.json';

// next-intl no avisa en build si un mensaje falta en un locale -- solo se
// nota en producción cuando ese locale específico intenta renderizar esa
// clave (o next-intl cae a un fallback silencioso según config). Este test
// protege contra ese desajuste apareciendo sin darse cuenta al agregar/editar
// traducciones en un solo idioma.

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

function flatten(obj: JSONValue, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return [prefix];
  }
  return Object.entries(obj).flatMap(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k));
}

describe('mensajes de i18n: es.json vs en.json', () => {
  it('ambos son objetos no vacíos', () => {
    expect(Object.keys(es).length).toBeGreaterThan(0);
    expect(Object.keys(en).length).toBeGreaterThan(0);
  });

  it('tienen exactamente el mismo set de claves (mismos namespaces y profundidad)', () => {
    const esKeys = new Set(flatten(es as JSONValue));
    const enKeys = new Set(flatten(en as JSONValue));

    const soloEnEs = Array.from(esKeys).filter(k => !enKeys.has(k)).sort();
    const soloEnEn = Array.from(enKeys).filter(k => !esKeys.has(k)).sort();

    expect(soloEnEs, 'claves presentes en es.json pero faltantes en en.json').toEqual([]);
    expect(soloEnEn, 'claves presentes en en.json pero faltantes en es.json').toEqual([]);
  });

  it('ningún mensaje queda como string vacío en ninguno de los dos locales', () => {
    const vacíosEs = flatten(es as JSONValue).filter(k => {
      const val = k.split('.').reduce((o: any, part) => o?.[part], es);
      return typeof val === 'string' && val.trim() === '';
    });
    const vacíosEn = flatten(en as JSONValue).filter(k => {
      const val = k.split('.').reduce((o: any, part) => o?.[part], en);
      return typeof val === 'string' && val.trim() === '';
    });
    expect(vacíosEs, 'claves con string vacío en es.json').toEqual([]);
    expect(vacíosEn, 'claves con string vacío en en.json').toEqual([]);
  });

  it('los placeholders ICU ({variable}) son los mismos en ambos idiomas para cada clave', () => {
    // Si una traducción usa {nombre} y la otra {name}, next-intl tira runtime
    // error al interpolar con el locale que no matchea el placeholder pasado.
    const extractPlaceholders = (s: string) => Array.from(s.matchAll(/\{(\w+)/g)).map(m => m[1]).sort();
    const keys = flatten(es as JSONValue);
    const desajustes: string[] = [];
    for (const key of keys) {
      const esVal = key.split('.').reduce((o: any, part) => o?.[part], es);
      const enVal = key.split('.').reduce((o: any, part) => o?.[part], en);
      if (typeof esVal !== 'string' || typeof enVal !== 'string') continue;
      const esPh = extractPlaceholders(esVal);
      const enPh = extractPlaceholders(enVal);
      if (JSON.stringify(esPh) !== JSON.stringify(enPh)) {
        desajustes.push(`${key}: es=${JSON.stringify(esPh)} en=${JSON.stringify(enPh)}`);
      }
    }
    expect(desajustes).toEqual([]);
  });
});
